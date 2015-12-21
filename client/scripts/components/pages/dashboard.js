'use strict';

import React from 'react';
import Reflux from 'reflux';

import TitleMixin from '../mixins/title';

import RangeStore from '../../stores/range';
import LatestStore from '../../stores/latest';

import UsageChart from '../graphs/usagechart';
import Stat from '../graphs/stat';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import $ from 'jquery';


export default React.createClass({
	page_title: 'Dashboard',

	mixins: [
		TitleMixin,
		Reflux.listenTo(RangeStore, 'refresh'),
		Reflux.listenTo(LatestStore, 'refresh')
	],

	refresh(){
		this.setState({});
	},

	getInitialState(){
		return {
			date_start: moment().subtract(1, 'days'),
			date_end: moment()
		}
	},

	componentDidMount(){
		$('.filter .shortcuts').on('click', 'button', (e) => {
			(e).preventDefault();

			var el = $(e.currentTarget);

			this.setState({
				date_start: moment().subtract(el.data('days'), 'days'),
				date_end: moment()
			})
		});
	},

	compoentWillUnmount(){
		$('.filter .shortcuts').off('click');
	},

	handleChange(){

	},

	render(){
		var latest = LatestStore.get(),
			minutes = parseInt(moment.duration(this.state.date_end.diff(this.state.date_start)).asMinutes());

		return (
			<div className="dashboard-content content-page">
				<div className="filter">
					<div className="shortcuts">
						Last:
						<button data-days="1">Day</button>
						<button data-days="7">Week</button>
						<button data-days="31">Month</button>
						<button data-days="365">Year</button>
					</div>
					<div className="date">
						Range: <DatePicker
							selected={this.state.date_start}
							dateFormat="DD/MM/YYYY"
							onChange={this.handleChange} />

						- <DatePicker
							selected={this.state.date_end}
							dateFormat="DD/MM/YYYY"
							onChange={this.handleChange} />
					</div>
				</div>
				<div className="stats">
					<Stat value={latest.usage} icon="electricity" unit="W" subtitle="Usage" />
					<Stat value={Math.round(latest.high)} icon="electricity" unit="kWh" subtitle="High" />
					<Stat value={Math.round(latest.low)} icon="electricity" unit="kWh" subtitle="Low" />
					<Stat value={Math.round(latest.high + latest.low)} icon="electricity" unit="kWh" subtitle="Total" />
					<Stat value={latest.gas} icon="gas" unit="m3" subtitle="Total gas" />
				</div>
				<UsageChart range={minutes} interval={minutes/5} />
			</div>
		);
	}
});
