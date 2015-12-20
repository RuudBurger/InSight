'use strict';

import React from 'react';
import Reflux from 'reflux';
import {History} from 'react-router';
import ReactCSSTransitionGroup from 'react/lib//ReactCSSTransitionGroup';

import Header from './header';
import Navigation from './navigation';

import MainActions from '../actions/main';

import classNames from 'classnames';
import $ from 'jquery';

export default React.createClass({

	mixins: [
		Reflux.listenTo(MainActions.toggleMenu, 'toggleMenu'),
		History
	],

	getInitialState(){
		return {
			loaded: false,
			hide_loader: false
		};
	},

	isLoaded(){
		if(UserStore.isLoaded() && ContentStore.isLoaded()){
			this.setState({
				loaded: true
			});
		}
	},

	componentDidMount(){

		// Catch clicks and touch events
		$(this.refs.wrapper)
			.on('touchstart', 'a, button, .button', this.ripple);


		setTimeout(() => {
			this.setState({
				loaded: true
			});

			setTimeout(() => {
				this.setState({
					hide_loader: true
				});
			}, 2000);
		}, 200);
	},

	toggleMenu(){
		$('body').toggleClass('show-menu');
	},

	/**
	 * Fill the touched area with a ripple effect
	 */
	ripple(e){
		var el = $(e.currentTarget),
			button = el.offset(),
			touch = e.originalEvent.touches ? e.originalEvent.touches[0] : e,
			x = touch.pageX - button.left,
			y = touch.pageY - button.top,
			ripple = $('<div class="ripple" />').css({
				left: x,
				top: y
			});

		el.append(ripple);

		requestTimeout(() => ripple.addClass('animate'), 0);
		requestTimeout(() => ripple.remove(), 2100);
	},

	render(){
		var key = this.props.location.pathname,
			classes = classNames('app', {
				loaded: this.state.loaded
			});

		return (
			<div ref="wrapper" className={classes}>
				{this.state.loaded ? [
					<Navigation key="navigation" />,
					<div key="app-content" className="app-content">
						<Header />
						<ReactCSSTransitionGroup component="div" transitionName="page" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
							<div className={'content content-' + key} key={key}>
								<div className="inner">{this.props.children}</div>
							</div>
						</ReactCSSTransitionGroup>
					</div>
				] : null}
				{this.state.hide_loader ? null :
				<div className="loading">
					<div>
						<div className="c1"></div>
						<div className="c2"></div>
						<div className="c3"></div>
						<div className="c4"></div>
					</div>
				</div>}
			</div>
		);

	}
});
