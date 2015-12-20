'use strict';

import React from 'react';
import Reflux from 'reflux';

import TitleMixin from '../mixins/title';

import RangeStore from '../../stores/range';
import LatestStore from '../../stores/latest';

import UsageChart from '../graphs/usagechart';
import Stat from '../graphs/stat';

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

	render(){
		var latest = LatestStore.get();

		return (
			<div className="dashboard-content content-page">
				<div className="stats">
					<Stat value={latest.usage} icon="electricity" unit="W" subtitle="Usage" />
					<Stat value={Math.round(latest.high)} icon="electricity" unit="kWh" subtitle="High" />
					<Stat value={Math.round(latest.low)} icon="electricity" unit="kWh" subtitle="Low" />
					<Stat value={Math.round(latest.high + latest.low)} icon="electricity" unit="kWh" subtitle="Total" />
					<Stat value={latest.gas} icon="gas" unit="m3" subtitle="Total gas" />
				</div>
				<UsageChart range={60 * 24} interval={300} />
			</div>
		);
	}
});
