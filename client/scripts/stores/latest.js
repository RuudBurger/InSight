'use strict';

import Reflux from 'reflux';

import actions from '../actions/range';

import API from '../components/mixins/api';

// Creates a DataStore
export default Reflux.createStore({
	listenables: [actions],
	mixins: [API],

	interval: 5,
	data: null,

	init(){
		this.data = {};
		this.updateData();
	},

	updateData(){
		this._get('latest', {
			success: this.output,
			complete: () => requestTimeout(this.updateData, this.interval * 1000)
		});
	},

	output(data){
		this.data = data;
		this.trigger(data);
	},

	get(){
		return this.data || {};
	}

});
