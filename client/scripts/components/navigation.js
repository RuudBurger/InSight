'use strict';

import React from 'react';
import {Link} from 'react-router';

import MainActions from '../actions/main';

const pages = [
	{route: 'dashboard', label: 'Dashboard'}
];

export default React.createClass({

	render(){
		var current_location = document.location.hash.substring(1);

		var pages_links = pages.map(page =>
			<Link key={'link-to-' + page.route}
				  to={'/' + page.route}
				  className={current_location.indexOf('/' + page.route) === 0 ? 'active' : ''}>
				<span>{page.label}</span>
			</Link>
		);

		return (
			<div className="navigation">
				<div className="foldout" onClick={MainActions.hideMenu}>
					<div className="split">
						{pages_links}
					</div>
				</div>
			</div>
		);
	}
});
