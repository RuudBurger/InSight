'use strict';

import './globals';

import ReactDOM from 'react-dom';
import Router from './router';

// Force redirect to home when first loading the app
// this is easier then using IndexLink stuff
var current_location = document.location.hash.substring(1);
document.location.hash = current_location === '' ? '/dashboard' : document.location.hash;

ReactDOM.render(Router, document.getElementById('wrapper'));
