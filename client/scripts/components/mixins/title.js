'use strict';

import MainActions from '../../actions/main';

export default {

	componentDidMount(){
		this._updateTitle();
		this._updateBackButton();
	},

	componentDidUpdate(){
		this._updateBackButton();
	},

	_updateTitle(){
		var title = '';
		if (this.getPageTitle){
			title = this.getPageTitle();
		}
		else if(this.page_title !== undefined){
			title = this.page_title || '';
		}

		MainActions.updateTitle(title);
	},

	_updateBackButton(){
		var url = null;
		if (this.getBackbuttonLink){
			url = this.getBackbuttonLink();
		}
		else if(this.backbutton_link !== undefined){
			url = this.backbutton_link || '';
		}

		if(url){
			MainActions.updateBackbutton(url);
		}
		else {
			MainActions.hideBackbutton();
		}
	}
};
