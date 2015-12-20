'use strict';

import MainStore from '../../stores/main';

import $ from 'jquery';

export default {

	/**
	 * POST request to api
	 * options.data can be used for post data
	 */
	_post(endpoint, options){
		this._call(endpoint, $.extend({}, {
			method : 'POST'
		}, options));
	},

	/**
	 * GET request to api
	 * options.data can be used for query parameters
	 */
	_get(endpoint, options){
		this._call(endpoint, $.extend({}, {
			method : 'GET'
		}, options));
	},

	/**
	 * Call api with user credentials when available
	 */
	_call(endpoint, options){
		var api_url = MainStore.getAPIUrl(endpoint),
			headers = {};

		$.ajax($.extend({}, {
			url: api_url,
			contentType : 'application/json',
			headers: headers
		}, options));
	}

};
