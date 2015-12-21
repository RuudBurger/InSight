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

	componentWillUpdate(nextProps){
		if(this.props.range != nextProps.range || this.props.interval != nextProps.interval){
			RangeActions.getRange(nextProps.range, nextProps.interval, null, this.updateDayData);
		}
	},

	// Don't update once generated
	shouldComponentUpdate(nextProps){
		return this.state.last_day.length == 0 || this.props.range != nextProps.range || this.props.interval != nextProps.interval;
	},

	render(){
		var series = [],
			current = null,
			tmp = {data:[]};

		var push = (tmp) => {
			tmp.name = current == 0 ? 'Low' : 'High';
			tmp.color = current == 0 ? '#666' : '#aa6666';
			series.push(tmp);
		}

		this.state.last_day.forEach(item => {

			tmp.data.push([item.timestamp * 1000, item.usage]);

			if(item.current != current){
				if(tmp.data.length > 1){
					push(tmp);
				}

				tmp = {
					data:[[item.timestamp * 1000, item.usage]]
				};
				current = item.current;
			}

		});

		push(tmp);


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
