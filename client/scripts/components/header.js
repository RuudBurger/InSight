'use strict';

import React from 'react';
import Reflux from 'reflux';
import {Link, History} from 'react-router';
import ReactCSSTransitionGroup from 'react/lib//ReactCSSTransitionGroup';

import MainActions from '../actions/main';

export default React.createClass({
	mixins: [
		Reflux.listenTo(MainActions.updateTitle, 'updateTitle'),
		Reflux.listenTo(MainActions.updateBackbutton, 'updateBackbutton'),
		Reflux.listenTo(MainActions.hideBackbutton, 'hideBackbutton'),
		History
	],

	getInitialState(){
		return {
			title: '',
			back: null
		}
	},

	updateTitle(title){
		this.setState({
			title: title
		});
	},

	updateBackbutton(url){
		this.setState({
			back: url
		});
	},

	hideBackbutton(){
		this.setState({
			back: null
		});
	},

	render(){
		var title, back;

		// Page title
		if(this.state.title instanceof Array){
			title = <span className="inner">
				{this.state.title.map((title) =>
					<span key={title}>{title}</span>
				)}
			</span>;
		}
		else {
			title = <span key={this.state.title} className={this.state.title.length > 20 ? 'long inner' : 'inner'}>{this.state.title}</span>;
		}

		if(this.state.back){
			back = <Link className="back" key={this.state.back} to={this.state.back}>
				<svg width="17" height="29" viewBox="0 0 17 29"><path d="M14.7493045,26.9148879 L4,14.2332084 L14.7493045,2" /></svg>
			</Link>;
		}

		return (
			<div className="header">
				<ReactCSSTransitionGroup component="div" transitionName="back" transitionEnterTimeout={1300} transitionLeaveTimeout={1300}>
					{back}
				</ReactCSSTransitionGroup>
				<h1 className="title">
					<ReactCSSTransitionGroup component="div" transitionName="title" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
						{title}
					</ReactCSSTransitionGroup>
				</h1>
				<div className="button menu-icon" onClick={MainActions.toggleMenu}>
					<span />
					<span />
					<span />
				</div>
			</div>
		);
	}
});
