'use strict';

import Reflux from 'reflux';
import actions from '../actions/main';

// Get config
import config from '../../config';

// Creates a DataStore
export default Reflux.createStore({
	listenables: [actions],

	env: 'production',
	config: null,

	menu_shown: false,

	init(){
		this.env = process.env.NODE_ENV;
		this.config = config[this.env];

		actions.configLoaded();
	},

	getAPIUrl(endpoint){
		var url = (this.config || {}).api || '';
			url += (endpoint ? '/' + endpoint : '');

		return url;
	},

	/**
	 * Toggle only when menu is shown
	 */
	onHideMenu(){
		if(this.menu_shown){
			actions.toggleMenu();
		}
	},

	/**
	 * Toggle only when menu is not shown
	 */
	onShowMenu(){
		if(!this.menu_shown){
			actions.toggleMenu();
		}
	},

	/**
	 * Toggle menu
	 */
	onToggleMenu(){
		this.menu_shown = !this.menu_shown;
	}
});
