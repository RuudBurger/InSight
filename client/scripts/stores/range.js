'use strict';

import Reflux from 'reflux';
import actions from '../actions/range';

import API from '../components/mixins/api';

// Creates a DataStore
export default Reflux.createStore({
	listenables: [actions],
	mixins: [API],

	onGetRange(range, interval, range_from, success){
		this._get('range', {
			success: success,
			data: {
				range: range || null,
				interval: interval || null,
				range_from: range_from || null
			}
		});
	}

});
