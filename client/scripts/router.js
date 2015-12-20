'use strict';

/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import {Router, Route} from 'react-router';

// History
import createHistory from 'history/lib/createHashHistory';

import Index from './components/index';
import Dashboard from './components/pages/dashboard';


export default (
	<Router history={createHistory()}>
		<Route path="/" component={Index}>
			<Route path="dashboard" component={Dashboard} />
		</Route>
	</Router>
);
